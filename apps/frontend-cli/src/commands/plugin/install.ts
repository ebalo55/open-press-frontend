import { Flags } from "@oclif/core";
import { mkdir, readdir, readFile, symlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { BaseCommand } from "../../base";
import { NextConventionalFilenames } from "../../constants";
import { loadPlugin, resolvePlugin } from "../../helpers";
import { ConfigurationJSON, PluginData } from "../../interfaces";

export class PluginInstall extends BaseCommand<typeof PluginInstall> {
	static summary = "Install a plugin";

	static examples = ["<%= config.bin %> <%= command.id %>"];

	static flags = {
		configuration: Flags.file({
			char: "c",
			description: "The path to the plugins configuration file",
			required: true,
			default: "./apps/frontend/aetheria.plugins.json",
		}),
		resolution_path: Flags.string({
			char: "r",
			description: "The path to the plugins resolution directory",
			required: true,
		}),
		name: Flags.string({
			char: "n",
			description: "The name of the plugin to install",
			required: true,
		}),
		tarball: Flags.boolean({
			char: "t",
			description: "Whether to install the plugin from a tarball",
			default: false,
			exclusive: ["npm"],
		}),
		npm: Flags.boolean({
			char: "N",
			description: "Whether to install the plugin from npm",
			default: false,
			exclusive: ["tarball"],
		}),
		app_path: Flags.string({
			char: "a",
			description: "The path to the app source directory",
			required: true,
			default: "./apps/frontend/app",
		}),
	};

	public async run(): Promise<void> {
		const configuration = await this.loadConfiguration();

		if (this.isLocalInstallation()) {
			this.warn("No installation method specified, defaulting to local installation");
			await this.runLocalInstallation(configuration);
		} else if (this.flags.tarball) {
			this.warn("Tarball installation is not yet supported");
		} else if (this.flags.npm) {
			this.warn("NPM installation is not yet supported");
		}
	}

	/**
	 * Load the configuration file
	 * @returns {Promise<ConfigurationJSON>} The configuration file
	 */
	async loadConfiguration() {
		return JSON.parse(await readFile(this.flags.configuration, "utf-8")) as ConfigurationJSON;
	}

	/**
	 * Save the configuration file
	 * @param {ConfigurationJSON} configuration The configuration content
	 * @returns {Promise<void>} The configuration file
	 */
	async saveConfiguration(configuration: ConfigurationJSON) {
		await writeFile(this.flags.configuration, JSON.stringify(configuration, null, 4));
	}

	async runLocalInstallation(configuration: ConfigurationJSON) {
		const plugin = loadPlugin(
			await resolvePlugin(this.flags.configuration, {
				id: this.flags.name,
				resolve: this.flags.resolution_path,
			})
		);

		if (configuration.plugins.find((value) => plugin.name === value.id)) {
			this.error(`Plugin ${plugin.name} is already installed, please uninstall it first`);
		}

		await this.install(plugin, configuration);
		await this.importNextRoutes();
	}

	async importNextRoutes() {
		this.log(`Importing next routes`);

		const resolution_path = resolve(this.flags.configuration, this.flags.resolution_path, "src/routes");
		const routes = await readdir(resolution_path, {
			encoding: "utf-8",
			recursive: true,
			withFileTypes: true,
		});

		const routesToImport = routes.filter(
			(value) => value.isFile() && NextConventionalFilenames.some((filename) => filename.test(value.name))
		);

		for (const route of routesToImport) {
			const folder = route.path.replaceAll(`${resolution_path}/`, "");

			try {
				const file_destination = resolve(this.flags.app_path, folder, route.name);

				// Creates the folder if it doesn't exist
				await mkdir(resolve(this.flags.app_path, folder), {
					recursive: true,
				});

				// Create the symlink to the route
				await symlink(resolve(route.path, route.name), file_destination);

				this.log(`Route '${folder}/${route.name}' imported!`);
			} catch (e: any) {
				this.warn(`Route '${folder}/${route.name}' already exists! Skipped.`);
				this.logDebug(e.message);
			}
		}
	}

	/**
	 * Install a plugin
	 * @param {PluginData} plugin The plugin to install
	 * @param {ConfigurationJSON} configuration The configuration file
	 * @returns {Promise<void>}
	 */
	async install(plugin: PluginData, configuration: ConfigurationJSON) {
		this.log(`Installing plugin ${plugin.name} (v${plugin.version})`);

		configuration.plugins.push({
			id: this.flags.name,
			resolve: this.flags.resolution_path,
		});
		await this.saveConfiguration(configuration);

		this.log(`Plugin ${plugin.name} (v${plugin.version}) installed`);
	}

	/**
	 * Check if the installation mode is local (aka not from npm or a tarball)
	 * @returns {boolean} Whether the installation is local
	 * @private
	 */
	private isLocalInstallation() {
		return !this.flags.tarball && !this.flags.npm;
	}
}

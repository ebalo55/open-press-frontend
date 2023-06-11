"use client";

import {Card, LoaderProps, Table, Text, Title} from "@mantine/core";
import {useInject, useSafeInject} from "@open-press/hooks";
import {INJECTION_TOKENS, TemplateEntity} from "@open-press/interfaces";
import useSWR from "swr";
import {CONFIG} from "@frontend/config";
import axios from "axios";
import {FC} from "react";
import {safeValidate} from "@open-press/frontend-utility/server";
import {ValidStatusCodeSchema} from "../../../../../../libs/frontend-utility/src/lib/validation/common-schemas";

export default function Dashboard(): JSX.Element {
    const bearer = useSafeInject(INJECTION_TOKENS.instances.authentication_token) || ""

    const Loader = useInject<{ Simple: FC<LoaderProps> }>(INJECTION_TOKENS.components.loaders)

    const {
        data,
        error,
        isLoading,
        isValidating
    } = useSWR(
        `${CONFIG.backend_url}/template`,
        (key: string) => axios.get<TemplateEntity[]>(key, {headers: {Authorization: `Bearer ${bearer}`}})
    )

    return (
        <Card shadow={"lg"} withBorder>
            <Title order={2}>Templates</Title>
            <Table
                withColumnBorders={!error && !isLoading && !isValidating && data && safeValidate(data.status, ValidStatusCodeSchema) && data.data.length > 0}
                verticalSpacing={"md"}>
                <thead>
                <tr>
                    <th>Template</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    // isLoading || isValidating ? (
                    <tr>
                        <td colSpan={4}>
                            <Loader.Simple size={"xl"} my={"xl"}/>
                            <Text size={"sm"} align={"center"} weight={600}>Loading templates...</Text>
                        </td>
                    </tr>
                    // ) : <></>
                }
                </tbody>
            </Table>
        </Card>
    );
}
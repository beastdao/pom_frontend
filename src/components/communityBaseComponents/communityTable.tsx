import {
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    createMRTColumnHelper,
    flexRender,
    type MRT_Cell,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { communities, Community } from '../../community_base/community_base_index';
import { mIsVerified } from '../wagmiHooks/multiReadIsVerified';
import { mMembersCount } from '../wagmiHooks/multiReadMembersCount';
import { useEffect, useState } from 'react';

const not_enough_members = 'Hidden';

const columnHelper = createMRTColumnHelper<Community>();
const columns = [
    {
        accessorKey: 'community_name',
        header: 'Community Name',
    },

    columnHelper.accessor('pom_community_handle', {
        header: 'Community Handle',
        Cell: ({ cell }: { cell: MRT_Cell<Community, string> }) => (
            <a href={'@' + cell.getValue()} target="_blank" rel="noopener noreferrer">
                {'@' + cell.getValue()}
            </a>
        ),
    }),
    {
        accessorKey: 'description',
        header: 'About',
    },

    columnHelper.accessor((row) => String(row.website), {
        header: 'Website',
        Cell: ({ cell }: { cell: MRT_Cell<Community, string> }) => {
            const url = cell.getValue();
            return url != not_enough_members && url !== 'NO' ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            ) : (
                <span> {url} </span>
            );
        },
    }),
    columnHelper.accessor((row) => String(row.main_social_platform.platform_name), {
        header: 'Social Platform',
        Cell: ({ cell }: { cell: MRT_Cell<Community, string> }) => {
            const { platform_name, invite_link } = cell.row.original.main_social_platform;
            console.log(platform_name);
            return (
                <a href={invite_link} target="_blank" rel="noopener noreferrer">
                    {platform_name}
                </a>
            );
        },
    }),

    {
        accessorKey: 'amount_of_members',
        header: 'Amount of Members',
    },
    {
        accessorKey: 'people_behind',
        header: 'People Behind',
    },
    {
        accessorKey: 'is_verified',
        header: 'Is Verified',
        Cell: ({ cell }: { cell: MRT_Cell<Community, string> }) => (
            <Box
                component="span"
                sx={(theme) => ({
                    backgroundColor:
                        cell.getValue<string>() == 'YES' ? theme.palette.success.dark : 'inherit',
                    borderRadius: '0.25rem',
                    color: cell.getValue<string>() === 'YES' ? '#fff' : 'inherit',
                    maxWidth: '9ch',
                    p: '0.25rem',
                })}
            >
                {cell.getValue<string>()}
            </Box>
        ),
    },
    {
        accessorKey: 'members_count',
        header: 'Proved Members',
    },
];

const CommunityTable = () => {
    const [data, setData] = useState<Community[]>([]);
    const handles: [string][] = communities.map((community) => [community.pom_community_handle]);
    const verificationResults = mIsVerified(handles);
    const membersCountResults = mMembersCount(handles);

    const areVerificationResultsReady = verificationResults.every(
        (result) => result.data !== undefined
    );
    const areMembersCountResultsReady = membersCountResults.every(
        (result) => result.data !== undefined
    );

    useEffect(() => {
        if (areVerificationResultsReady && areMembersCountResultsReady) {
            const updatedData = communities.map((community, index) => {
                const membersCount = membersCountResults[index].data
                    ? Number(membersCountResults[index].data)
                    : 0;
                return {
                    ...community,
                    website:
                        membersCount < 3 && community.website !== 'NO'
                            ? not_enough_members
                            : community.website,
                    is_verified: verificationResults[index].data ? 'YES' : 'NO',
                    members_count: membersCount.toString(),
                };
            });

            setData(updatedData);
        }
    }, [areVerificationResultsReady, areMembersCountResultsReady]);

    const table = useMaterialReactTable({
        columns,

        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

        //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`

        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
            showGlobalFilter: true,
        },

        //customize the MRT components

        muiPaginationProps: {
            rowsPerPageOptions: [10, 50, 100],
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });

    return (
        <Stack sx={{ width: '90vw', m: '2rem 0', mx: 'auto' }}>
            <center>
                <a href="https://discord.gg/McqF7vyCWx" target="_blank" rel="noopener noreferrer">
                    <img
                        alt="Discord"
                        src="https://img.shields.io/discord/1071459720554098788?style=plastic&label=JOIN%20DISCORD%20TO%20GET%20INFO%20ABOUT%20COMMUNITIES%20FROM%20FIRST%20HAND&labelColor=%23000000&color=%23AC80F3"
                    ></img>
                </a>
            </center>
            <Box
                sx={{
                    display: 'flex',

                    justifyContent: 'space-between',

                    alignItems: 'center',
                }}
            >
                {/**

         * Use MRT components along side your own markup.

         * They just need the `table` instance passed as a prop to work!

         */}

                <MRT_GlobalFilterTextField table={table} />

                <MRT_TablePagination table={table} />
            </Box>

            {/* Using Vanilla Material-UI Table components here */}

            <TableContainer>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        align="center"
                                        variant="head"
                                        key={header.id}
                                        sx={{
                                            backgroundColor: '#deccfa',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.Header ??
                                                      header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <TableRow key={row.id} selected={row.getIsSelected()}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell align="center" variant="body" key={cell.id}>
                                        {/* Use MRT's cell renderer that provides better logic than flexRender */}

                                        <MRT_TableBodyCellValue
                                            cell={cell}
                                            table={table}
                                            staticRowIndex={rowIndex} //just for batch row selection to work
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Stack>
    );
};

export default CommunityTable;

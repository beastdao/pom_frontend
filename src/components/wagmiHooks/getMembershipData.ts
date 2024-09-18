import { useContractRead } from 'wagmi';
import { storageConfig } from './contracts';

type MembershipData = {
  name: string;
  community: string;
  memberSince: bigint;
};

export function useGetMembershipData(tokenId: any) {
  const { data, refetch, isError, isLoading } = useContractRead({
    ...storageConfig,
    functionName: 'getMembershipData',
    args: [tokenId],
    // watch: true,
  });

  const membershipData: MembershipData | null = data && typeof data === 'object' && !Array.isArray(data)
    ? {
        name: (data as MembershipData).name,
        community: (data as MembershipData).community,
        memberSince: BigInt((data as MembershipData).memberSince),
      }
    : null;

  return {
    membershipData,
    refetch,
    isError,
    isLoading,
  };
}

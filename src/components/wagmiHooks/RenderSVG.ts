import { useReadContract } from 'wagmi';
import { svgRendererConfig } from './contracts';

export type ColorScheme = {
    stBKG: string;
    stTextBox: string;
    stWitchFrameBKG: string;
    stWitchSLT: string;
    stWitchFace: string;
    stCardTitle: string;
    stTextCLR: string;
    stDrop1: string;
    stDrop2: string;
};
/*
export var defaultColorScheme = {
  stBKG: "#dbf595",
  stTextBox: "#7587bf",
  stWitchFrameBKG: "#dbf595",
  stWitchSLT: "#ed76be",
  stWitchFace: "#dbf595",
  stCardTitle: "#ad63ba",
  stTextCLR: "#e8c285",
  stDrop1: "#dbf595",
  stDrop2: "#dbf595"
};
*/
export const defaultColorScheme = {
    stBKG: '#000000',
    stTextBox: '#ffffff',
    stWitchFrameBKG: '#ac80f3',
    stWitchSLT: '#000000',
    stWitchFace: '#ffffff',
    stCardTitle: '#ad63ba',
    stTextCLR: '#000000',
    stDrop1: '#ac80f3',
    stDrop2: '#61bbdd',
};

export function RenderSVG(
    nameAtCommunity: string,
    memberSince: string,
    role: string,
    communityName: string,
    colorScheme?: ColorScheme
) {
    const finalColorScheme = colorScheme ?? defaultColorScheme;

    const { data, refetch, isError, isLoading } = useReadContract({
        ...svgRendererConfig,
        functionName: 'RenderSVGDummy',
        args: [nameAtCommunity, memberSince, role, communityName, finalColorScheme],
        //watch: true,
    });

    return {
        data,
        refetch,
        isError,
        isLoading,
    };
}

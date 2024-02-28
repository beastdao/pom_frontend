import { useContractRead } from 'wagmi';
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
export var defaultColorScheme = {
  stBKG: "#000000",
  stTextBox: "#ffffff",
  stWitchFrameBKG: "#ac80f3",
  stWitchSLT: "#000000",
  stWitchFace: "#ffffff",
  stCardTitle: "#ad63ba",
  stTextCLR: "#000000",
  stDrop1: "#ac80f3",
  stDrop2: "#61bbdd"
};













export function RenderSVG(nameAtCommunity: string, memberSince: string, role: string, communityName: string, colorScheme?: ColorScheme) {
  const finalColorScheme = colorScheme ?? defaultColorScheme;

  const { data, refetch, isError, isLoading } = useContractRead({
    ...svgRendererConfig,
    address: "0x21DA9d030582A8a59143A9568c24C1c8a7ef6c57",
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

import { Ability } from './Ability';
import { RadiantRole } from './RadiantRole';

export interface Radiant {
  uuid: string;
  displayName: string;
  description?: string | null;
  developerName?: string | null;
  characterTags?: Array<string> | null;
  displayIcon?: string;
  displayIconSmall?: string | null;
  bustPortrait?: string | null;
  fullPortrait?: string | null;
  fullPortraitV2?: string | null;
  killfeedPortrait?: string | null;
  background?: string | null;
  backgroundGradientColors?: Array<string>;
  assetPath?: string | null;
  isFullPortraitRightFacing?: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest?: boolean;
  isBaseContent?: boolean;
  role?: RadiantRole | null;
  abilities?: Array<Ability> | null;
  voiceLine?: object;
}

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tile } from './index.js';

export const Primary: ComponentStory<typeof Tile> = () => <Tile>Data</Tile>;

Primary.args = {};

export default {
  component: Tile,
  title: 'Pure/Tile'
} as ComponentMeta<typeof Tile>;

Primary.storyName = 'Primary';

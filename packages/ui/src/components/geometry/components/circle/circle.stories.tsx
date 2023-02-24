import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Circle } from './index.js';

const Template: ComponentStory<typeof Circle> = (args) => (
  <Circle className="bg-secondary-purple-100 h-60 w-60" {...args} />
);

export const Primary = Template.bind({}) as ComponentStory<typeof Circle>;

Primary.args = {};

export default {
  component: Circle,
  title: 'Pure/Geometry/Circle'
} as ComponentMeta<typeof Circle>;

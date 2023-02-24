import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './index.js';

export const Primary: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

Primary.args = {};

export default {
  component: Button,
  title: 'Pure/Button',
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
} as ComponentMeta<typeof Button>;

Primary.storyName = 'Primary';

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './index.js';

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({}) as ComponentStory<typeof Input>;

Primary.args = {
  type: 'text'
};

export default {
  component: Input,
  title: 'Pure/Form/Input',
  argTypes: {
    withError: {
      type: 'boolean'
    }
  }
} as ComponentMeta<typeof Input>;

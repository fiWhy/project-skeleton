import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Textarea } from './index.js';

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Primary = Template.bind({}) as ComponentStory<typeof Textarea>;

Primary.args = {
  type: 'text'
};

export default {
  component: Textarea,
  title: 'Pure/Form/Textarea',
  argTypes: {
    withError: {
      type: 'boolean'
    }
  }
} as ComponentMeta<typeof Textarea>;

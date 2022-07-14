import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Filters from '@/components/Filters.vue';

describe('The Filter-component ', () => {
  it('renders with the correct text and a hidden modal', () => {
    const wrapper = mount(Filters);
    const modal = wrapper.find('.modal');
    expect(wrapper.text()).toContain('Filter');
    expect(modal.classes()).not.toContain('is-active');
  });

  it('has an open modal, after the “filter-button“ was clicked', async () => {
    const wrapper = mount(Filters);
    const modal = wrapper.find('.modal');
    await wrapper.find('#openModal').trigger('click');
    expect(modal.classes()).toContain('is-active');
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import Filters from "@/components/Filters.vue";

describe("The Filter-component ", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders with the correct text and a hidden modal", () => {
    const wrapper = mount(Filters);
    const modal = wrapper.find(".modal");
    expect(wrapper.text()).toContain("Filter");
    expect(modal.isVisible()).not.toBeTruthy();
  });

  it("has an open modal, after the “filter-button“ was clicked", async () => {
    const wrapper = mount(Filters);
    const modal = wrapper.find(".modal");
    await wrapper.find("#openModal").trigger("click");
    expect(modal.isVisible()).toBeTruthy();
  });
});

<template>
  <div class="dropdown">
    <select
      :disabled="disable"
      @mousedown="noOutline"
      @blur="removeNoOutline"
      :value="selectedValue"
      @change="change"
    >
      <option v-for="op in options" :key="op.value" :value="op.value">
        {{ op.name || op.value }}
      </option>
    </select>
  </div>
</template>

<script>
import { uniqueId } from "lodash";

export default {
  props: {
    id: {
      type: String,
      default: () => uniqueId(),
    },
    disable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      required: true,
    },
  },
  methods: {
    noOutline(e) {
      const select = e.target;
      if (!select.classList.contains("no-outline")) {
        select.classList.add("no-outline");
      }
    },
    removeNoOutline(e) {
      const select = e.target;
      select.classList.remove("no-outline");
    },
    change(e) {
      this.$emit("update:" + this.id, e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
$width: clamp(9rem, 13vw, 12rem);
.dropdown {
  select {
    width: $width;
    height: calc($width/4.15);
    min-width: max-content;
    min-height: max-content;
    appearance: none;
    -webkit-appearance: none;
    border-radius: 5px;
    border: 0.1rem solid #dbd9d7;
    font-size: calc(0.8 * var(--modal-content-font-size));
    cursor: pointer;
    padding: 0.5rem;

    background-image: url("../../assets/images/icon/chevron-down.svg");
    background-repeat: no-repeat;
    background-size: calc(0.6 * var(--modal-content-font-size));
    background-position: calc(100% - 0.5rem) 50%, calc(100% - 0.5rem) 50%;
    background-color: white;

    &:disabled {
      pointer-events: none;
      background-color: #dbd9d7;
    }
    &.no-outline {
      outline: none !important;
    }
  }
}
</style>

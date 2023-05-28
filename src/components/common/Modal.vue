<template>
  <Teleport to="#modal-wrap">
    <Transition name="modal">
      <div v-if="open" class="modal-bg">
        <OnClickOutside
          @trigger="$emit('close')"
          class="modal"
          :id="`modal-${id}`"
          tabindex="0"
          @keyup="handleKeyUpModal"
        >
          <div class="modal-top">
            <div role="heading" class="modal-heading">
              <slot name="modalHeading"></slot>
            </div>
            <button class="close-button" @click="$emit('close')">
              <img src="../../assets/images/icon/close-icon-round.svg" />
            </button>
          </div>
          <div role="content" class="modal-content">
            <slot name="modalContent"></slot>
          </div>
        </OnClickOutside>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { uniqueId } from "lodash";
import { OnClickOutside } from "@vueuse/components";

export default {
  emits: ["close"],
  components: {
    OnClickOutside,
  },
  props: {
    id: {
      type: String,
      default: () => uniqueId(),
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    open(isOpen) {
      if (isOpen) {
        // Focus on modal for tabbing
        this.$nextTick(() => {
          document.getElementById(`modal-${this.id}`).focus();
        });
      } else {
        // Z-index stacking works weird for nav
        const controlButton = document.getElementById("navigation-control");
        controlButton.style.zIndex = 1001;
      }
    },
  },
  methods: {
    handleKeyUpModal(e) {
      const code = e.keyCode;
      if (code === 27) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
.modal-bg {
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.5);
  .modal {
    background: white;
    border-radius: 5px;
    width: max-content;
    min-width: 30%;
    max-width: 60%;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.1);
    .close-button {
      border: 0;
      background: none;
      display: flex;
      align-items: center;
      height: max-content;
      img {
        aspect-ratio: 1;
        width: 1rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .modal-top {
      display: flex;
      justify-content: space-between;
      background: #dbd9d7;
      align-items: center;

      padding: 0.75rem 1rem;
      .modal-heading {
        font-size: var(--modal-heading-font-size);
        font-weight: 600;
      }
    }
    .modal-content {
      padding: 1rem 1rem 1.5rem 1rem;
      font-size: var(--modal-content-font-size);
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: var(--tran-03);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

@media (max-width: 50rem) {
  .modal-bg {
    .modal {
      min-width: 60%;
      max-width: 80%;
    }
  }
}
</style>

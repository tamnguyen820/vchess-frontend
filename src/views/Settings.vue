<template>
  <div class="view">
    <div id="settings">
      <div class="categories-area">
        <div class="category" v-for="(category, index) in categories" :key="category"
          :class="{ chosen: index === curCategoryIdx }" @click="setCurCategoryIdx(index)" role="button" tabindex="0"
          @keyup="handleKeyUpCategory($event, index)">
          {{ category }}
        </div>
      </div>
      <div class="content-area">
        <div v-if="curCategoryIdx === 0" class="board-pieces">
          <div class="left-side">
            <div>Board</div>
            <Dropdown id="board-theme" :options="allBoardThemes" :selectedValue="curBoardTheme"
              @update:board-theme="changeBoardTheme" />
            <div>Piece set</div>
            <Dropdown id="piece-theme" :options="allPieceThemes" :selectedValue="curPieceTheme"
              @update:piece-theme="changePieceTheme" />
          </div>
          <Board inert class="zoom-board" />
        </div>
        <div v-if="curCategoryIdx === 1">
          <div class="left-side">
            <div>Sound</div>
            <Toggle id="sound" :value="getSoundOn" @change-input-toggle-sound="changeSound" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { boardThemes, pieceSets } from "../scripts/themes";
import { mapGetters, mapMutations } from "vuex";

import Dropdown from "../components/common/Dropdown.vue";
import Toggle from "../components/common/Toggle.vue";
import Board from "../components/Board.vue";

export default {
  components: { Dropdown, Toggle, Board },
  data() {
    return {
      categories: ["Board & pieces", "Sound"],
      curCategoryIdx: 0,

      curBoardTheme: "",
      curPieceTheme: "",
    };
  },
  created() {
    this.createNewGame();
  },
  mounted() {
    this.changeBoardTheme(this.getBoardThemeValue);
    this.changePieceTheme(this.getPieceTheme);
  },
  computed: {
    ...mapGetters({
      getBoardThemeValue: "settings/getBoardThemeValue",
      getPieceTheme: "settings/getPieceTheme",
      getSoundOn: "settings/getSoundOn",
    }),

    allBoardThemes() {
      return boardThemes;
    },
    allPieceThemes() {
      return pieceSets.map((set) => ({ value: set }));
    },
  },
  methods: {
    ...mapMutations({
      setBoardTheme: "settings/setBoardTheme",
      setPieceTheme: "settings/setPieceTheme",
      setSoundOn: "settings/setSoundOn",

      createNewGame: "game/createNewGame",
    }),
    setCurCategoryIdx(idx) {
      this.curCategoryIdx = idx;
    },
    handleKeyUpCategory(e, index) {
      const code = e.keyCode;
      if (code === 13 || code === 32) {
        this.setCurCategoryIdx(index);
      }
    },

    changeBoardTheme(theme) {
      this.curBoardTheme = theme;
      this.setBoardTheme(theme);
    },
    changePieceTheme(theme) {
      this.curPieceTheme = theme;
      this.setPieceTheme(theme);
    },

    changeSound(val) {
      this.setSoundOn(val);
    }
  },
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  justify-content: center;

  #settings {
    height: 90vh;
    width: 80vw;
    background-color: var(--off-white);
    border-radius: 10px;
    align-self: center;
    display: flex;
    overflow: hidden;
    font-size: var(--modal-content-font-size);

    .categories-area {
      background-color: #a52a2a;
      height: 100%;
      width: 15%;

      .category {
        cursor: pointer;
        font-weight: 500;
        padding: calc(0.5 * var(--modal-content-font-size));
        color: var(--off-white);
      }

      .chosen {
        background-color: var(--off-white);
        color: black;
        color: #a52a2a;
      }
    }

    .content-area {
      height: 100%;
      width: 85%;

      >div {
        padding: 2rem;
      }

      .board-pieces {
        display: flex;
        justify-content: space-between;

        .zoom-board {
          max-width: max(37vw, 40vh) !important;
        }
      }

      .left-side {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
}

@media (max-width: 50rem) {
  .view {
    #settings {
      flex-direction: column;

      .categories-area {
        display: flex;
        height: auto;
        width: 100%;
      }

      .content-area {
        height: 100%;
        width: 100%;

        .board-pieces {
          flex-direction: column;

          .zoom-board {
            max-width: max(60vw, 60vh) !important;
          }
        }

        .left-side {
          flex-direction: row;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

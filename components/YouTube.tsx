import { Node, mergeAttributes } from "@tiptap/core";

const YouTube = Node.create({
  name: "youtube",

  defaultOptions: {
    HTMLAttributes: {},
  },

  group: "block",

  draggable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "video-container" },
      ["iframe", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      setYouTube:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name, attrs: attributes });
        },
    };
  },
});

export default YouTube;

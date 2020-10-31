import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Editor from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../utils/editorTools";

export default class BlogEditor extends Component {
  render() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <label for="title" class="sr-only">
              Title
            </label>
            <div class="relative">
              <TextareaAutosize
                id="title"
                class="block w-full text-4xl font-bold text-gray-800 leading-9 outline-none pt-3 "
                placeholder="Title of the post"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div className="mb-10">
            <label for="subtitle" class="sr-only">
              Sub-Heading
            </label>
            <div class="relative">
              <TextareaAutosize
                id="subtitle"
                class="block w-full text-xl text-gray-500 leading-6 outline-none"
                placeholder="Sub-heading for the post"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <Editor
            tools={EDITOR_JS_TOOLS}
            placeholder="Here goes the body. Markdown shortcuts also work."
          />
        </div>
      </div>
    );
  }
}

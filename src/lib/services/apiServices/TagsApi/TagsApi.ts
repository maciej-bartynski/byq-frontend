import { store } from "reduxStorage/store"
import { clearTags, createTagAsync, deleteTagAsync, editTagAsync, getTagsAsync } from "reduxStorage/tags/tags";
import { Tag } from "types/Tag";

const TagsApi = {
    workspaceId: "",

    clearTags: function () {
        store.dispatch(clearTags());
    },

    fetchTags: function () {
        store.dispatch(getTagsAsync(this.workspaceId))
    },

    createTag: function (tagFields: Omit<Tag, "_id">) {
        store.dispatch(createTagAsync({ tagFields, workspaceId: this.workspaceId }));
    },

    deleteTag: function (tagId: Tag["_id"]) {
        store.dispatch(deleteTagAsync({
            workspaceId: this.workspaceId,
            tagId
        }));
    },

    updateTag: function (tagFields: Tag) {
        store.dispatch(editTagAsync({ tagFields, workspaceId: this.workspaceId }));
    }
}

export default TagsApi
import copy from "copy-to-clipboard";
import {message} from "antd";

export const copyLink = (link) => {
    copy(link);
    message.success('复制成功');
};

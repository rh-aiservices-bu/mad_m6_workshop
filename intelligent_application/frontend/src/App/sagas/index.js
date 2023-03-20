import { watchWsOpen } from "./wsOpen";
import { watchGetStatus } from "./getStatus";

const exportedObject = [watchWsOpen(), watchGetStatus()]

export default exportedObject;

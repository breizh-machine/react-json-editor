import { v4 as uuid } from "uuid";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadJsonFile = async (jsonString: string) => {
  const fileName = uuid();
  const blob = new Blob([jsonString], { type: "application/json" });
  try {
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error: fail to download a file.");
  }
};
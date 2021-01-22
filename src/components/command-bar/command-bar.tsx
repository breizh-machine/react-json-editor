import React, { useRef } from "react";

import {
  CommandBar as CommandBarComponent,
  ICommandBarItemProps,
  CommandButton,
  Checkbox,
  DefaultButton,
} from "@fluentui/react";

export interface CommandBarProps {
  onMinifyClick: () => void;
  onPrettifyClick: () => void;
  isAutoPrettify: boolean;
  onClearClick: () => void;
  onLivePrettifyChange: () => void;
  onDownloadClick: () => void;
  onUploadClick: (target: HTMLInputElement) => void;
  isValidJson: boolean;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  onMinifyClick,
  onPrettifyClick,
  isAutoPrettify,
  onLivePrettifyChange,
  onClearClick,
  onDownloadClick,
  onUploadClick,
  isValidJson,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOnChange = () => {
    const target = inputFileRef.current;
    if (!target) return;
    onUploadClick(target);
  };

  const leftItems: ICommandBarItemProps[] = [
    {
      key: "upload",
      // name: 'Upload xml Document',
      text: "Upload",
      iconProps: { iconName: "Upload" },
      onClick: handleOnChange,
    },
    {
      key: "download",
      text: "Download",
      ariaLabel: "Grid view",
      iconProps: { iconName: "Download" },
      onClick: onDownloadClick,
    },
    {
      key: "upload-dummy",
      text: "Upload",
      onRender: () => (
        <input
          ref={inputFileRef}
          style={{ display: "none" }}
          type="file"
          accept="application/json"
          onChange={handleOnChange}
        />
      ),
    },
    {
      key: "clear",
      text: "Clear",
      iconProps: { iconName: "Delete" },
      onClick: onClearClick,
    },
    {
      key: "prettify",
      text: "Prettify",
      iconProps: { iconName: "MaximumValue" },
      onClick: onPrettifyClick,
    },
    {
      key: "Minify",
      text: "Minify",
      iconProps: { iconName: "MinimumValue" },
      onClick: onMinifyClick,
    },
    {
      key: "live-prettify",
      onRender: () => (
        <CommandButton>
          <Checkbox
            label="Live Prettify"
            onChange={onLivePrettifyChange}
            checked={isAutoPrettify}
          />
        </CommandButton>
      ),
    },
  ];

  const rightItems: ICommandBarItemProps[] = [
    {
      key: "submit",
      text: "Submit",
      // onClick: () => console.log("Info"),
      onRender: () => (
        <div>
          <DefaultButton
            iconProps={{ iconName: "Save" }}
            primary
            disabled={isValidJson}
            text="Submit"
            allowDisabledFocus
          />
        </div>
      ),
    },
    {
      key: "info",
      text: "Info",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Info",
      iconOnly: true,
      iconProps: { iconName: "Info" },
      // onClick: () => console.log("Info"),
    },
  ];

  return (
    <div>
      <CommandBarComponent
        styles={{
          root: {
            alignItems: "center",
          },
        }}
        items={leftItems}
        farItems={rightItems}
        ariaLabel="json content commands"
      />
    </div>
  );
};

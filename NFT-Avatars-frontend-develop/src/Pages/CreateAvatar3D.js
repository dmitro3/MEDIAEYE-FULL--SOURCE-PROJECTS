import React, { useState, useEffect, useCallback } from "react";
import constants from "../Components/Avatar/Avatar3D/constants";
import { generateWave } from "../Components/Avatar/Avatar3D/utils";
import { ToolbarContainer } from "../Components/Avatar/Avatar3D/Avatar3Dcomponents/ToolbarContainer";
import { ButtonTip } from "../Components/Avatar/Avatar3D/Avatar3Dcomponents/ButtonTip";
import { AvatarPreviewContainer } from "../Components/Avatar/Avatar3D/Avatar3Dcomponents/AvatarPreviewContainer";
import { AvatarConfigurationPanel } from "../Components/Avatar/Avatar3D/Avatar3Dcomponents/AvatarConfigurationPanel";
import { AvatarEditor } from "../Components/Avatar/Avatar3D/Avatar3Dcomponents/AvatarEditor";
import { dispatch } from "../Components/Avatar/Avatar3D/dispatch";
import { generateRandomConfig } from "../Components/Avatar/Avatar3D/generate-random-config";
import initialAssets from "../Components/Avatar/Avatar3D/assets";
import { isThumbnailMode } from "../Components/Avatar/Avatar3D/utils";
import debounce from "../Components/Avatar/Avatar3D/utils/debounce";
import "../Components/Avatar/Avatar3D/game";
import "../../src/assets/Avatar3D/styles.css";

// Used externally by the generate-thumbnails script
const thumbnailMode = isThumbnailMode();

const CreateAvatar = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [hoveredConfig, setHoveredConfig] = useState({});
  const debouncedSetHoveredConfig = useCallback(debounce(setHoveredConfig), [
    setHoveredConfig,
  ]);
  const [canvasUrl, setCanvasUrl] = useState(null);

  const initialConfig = generateRandomConfig(assets);
  const [avatarConfig, setAvatarConfig] = useState(initialConfig);
  const [tipState, setTipState] = useState({
    visible: false,
    text: "",
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!thumbnailMode) {
      dispatch(constants.avatarConfigChanged, {
        avatarConfig: { ...avatarConfig, ...hoveredConfig },
      });
    }
    dispatch(constants.reactIsLoaded);
  });

  // TODO: Save the wave to a static image, or actually do some interesting animation with it.
 
  useEffect(() => {
    const generateAvatar = async () => {
      if (canvasUrl === null) {
        setCanvasUrl(await generateWave());
      }
    };
    generateAvatar();
  }, []);
  // useEffect(() => {
  //   generateAvatar();
  // }, []);
  // useEffect(async () => {
  //   if (canvasUrl === null) {
  //     setCanvasUrl(await generateWave());
  //   }
  // });

  function updateAvatarConfig(newConfig) {
    setAvatarConfig({ ...avatarConfig, ...newConfig });
  }

  function showTip(text, top, left) {
    setTipState({ visible: true, text, top, left });
  }

  function hideTip() {
    setTipState({ visible: false });
  }

  function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.substring(1);
  }

  // TODO Share this code with the generate-assets script.
  function parseFilename(fullname, categoryNamePrefix, fallbackCategoryName) {
    const filename = fullname.substring(0, fullname.lastIndexOf("."));

    let [hyphenatedCategory, hyphenatedName] = filename.split("_");
    if (!hyphenatedName) {
      hyphenatedCategory = fallbackCategoryName;
      hyphenatedName = filename;
    } else {
      hyphenatedCategory = categoryNamePrefix + "-" + hyphenatedCategory;
    }
    const category = hyphenatedCategory
      .split("-")
      .map((p) => capitalize(p))
      .join(" ");
    const displayName = hyphenatedName
      .split("-")
      .map((p) => capitalize(p))
      .join(" ");
    return [category, displayName];
  }

  function onGLBUploaded(e) {
    const file = e.target.files[0];

    let [category, displayName] = parseFilename(
      file.name,
      "Uploaded",
      "Uploads"
    );
    const url = URL.createObjectURL(file);

    const clone = { ...assets };

    clone[category] = clone[category] || {
      parts: [
        {
          displayName: "None",
          value: null,
        },
      ],
    };

    clone[category].parts.push({
      displayName,
      value: url,
    });

    setAssets(clone);

    updateAvatarConfig({ [category]: url });
  }

  function randomizeConfig() {
    setAvatarConfig(generateRandomConfig(assets));
  }
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaeyeAvatar-createfirst">
              <div className="mediaeyeAvatar-createfirst-header">
                <h1>Create METAVATAR</h1>
              </div>
              <div
                className="mediaeyeAvatar-createfirst-content"
                style={{ height: "85vh" }}
              >
                {/* <iframe src="https://mediaeyenft.readyplayer.me/avatar" style={{"height" : "800px", "width" : "100%"}} title="Create 3D Avatar"></iframe> */}
                <AvatarEditor
                  {...{
                    thumbnailMode,
                    leftPanel: (
                      <AvatarConfigurationPanel
                        {...{
                          avatarConfig,
                          assets,
                          onScroll: () => {
                            hideTip();
                          },
                          onSelectAvatarPart: ({ categoryName, part }) => {
                            updateAvatarConfig({ [categoryName]: part.value });
                          },
                          onHoverAvatarPart: ({
                            categoryName,
                            part,
                            tip,
                            rect,
                          }) => {
                            debouncedSetHoveredConfig({
                              [categoryName]: part.value,
                            });
                            showTip(
                              tip,
                              rect.bottom,
                              rect.left + rect.width / 2
                            );
                          },
                          onUnhoverAvatarPart: () => {
                            debouncedSetHoveredConfig({});
                            hideTip();
                          },
                        }}
                      />
                    ),
                    rightPanel: (
                      <AvatarPreviewContainer
                        {...{ thumbnailMode, canvasUrl }}
                      />
                    ),
                    buttonTip: <ButtonTip {...tipState} />,
                    toolbar: (
                      <ToolbarContainer
                        {...{ onGLBUploaded, randomizeConfig }}
                      />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateAvatar;

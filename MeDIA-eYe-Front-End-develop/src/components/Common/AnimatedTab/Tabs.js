import React, { useEffect, useRef, useState } from 'react';
export default function Tabs(props) {
  const { activeTab, tabs, onTabChange } = props;
  let transitionTimer;
  const tabsRef = useRef(null);
  useEffect(() => {
    moveSlider(activeTab, true);
  }, [activeTab]);

  const moveSlider = (index, init) => {
    const currentTab = tabsRef.current.children[index];
    const tabsWidth = tabsRef.current.getBoundingClientRect().width;
    const currentTabWidth = currentTab.getBoundingClientRect().width;

    const rightPercentage =
      ((currentTab.offsetLeft - 0 + currentTabWidth) * 100) / tabsWidth + '%';
    const leftPercentage =
      ((currentTab.offsetLeft + 0) * 100) / tabsWidth + '%';
    const sideProperty = (withTimer) => {
      if (!withTimer) return index > activeTab ? '--right-side' : '--left-side';

      return index > activeTab ? '--left-side' : '--right-side';
    };

    const sidePercentage = (withTimer) => {
      if (!withTimer)
        return index > activeTab ? rightPercentage : leftPercentage;

      return index > activeTab ? leftPercentage : rightPercentage;
    };
    tabsRef.current.style.setProperty(sideProperty(), sidePercentage());

    if (init) {
      tabsRef.current.style.setProperty(
        sideProperty(true),
        sidePercentage(true)
      );

      return;
    }

    if (transitionTimer) {
      clearTimeout(transitionTimer);
    }

    transitionTimer = setTimeout(() => {
      tabsRef.current.style.setProperty(
        sideProperty(true),
        sidePercentage(true)
      );
      transitionTimer = undefined;
    }, 350);
  };

  const renderTabs = () => {
    return tabs.map((t, i) => {
      let className = 'mediaeye-tabss-lists-tab';
      if (i === activeTab) {
        className += ' mediaeye-tabss-lists-tab-active';
      }
      return (
        <div
          className={className}
          key={i}
          onClick={(e) => {
            moveSlider(i);
            onTabChange(i);
          }}
        >
          {t}
        </div>
      );
    });
  };

  return (
    <div className="mediaeye-tabss-lists" ref={tabsRef}>
      {renderTabs()}
      <div className="mediaeye-tabss-lists-tab-line" />
    </div>
  );
}

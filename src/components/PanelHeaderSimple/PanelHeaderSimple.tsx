import React, { HTMLAttributes, ReactNode, useContext } from 'react';
import usePlatform from '../../hooks/usePlatform';
import getClassname from '../../helpers/getClassName';
import classNames from '../../lib/classNames';
import FixedLayout from '../FixedLayout/FixedLayout';
import Separator from '../Separator/Separator';
import { ANDROID } from '../../lib/platform';
import { HasRef, HasRootRef } from '../../types/props';
import ConfigProviderContext from '../ConfigProvider/ConfigProviderContext';

export interface PanelHeaderSimpleProps extends HTMLAttributes<HTMLDivElement>, HasRef<HTMLDivElement>, HasRootRef<HTMLDivElement> {
  left?: ReactNode;
  addon?: ReactNode;
  right?: ReactNode;
  separator?: boolean;
  transparent?: boolean;
  /**
   * Если `false`, то шапка будет нулевой высоты и контент панели "залезет" под неё
   */
  visor?: boolean;
}

const PanelHeaderSimple = ({
  className,
  left,
  addon,
  children,
  right,
  separator,
  visor,
  transparent,
  getRef,
  getRootRef,
  ...restProps
}: PanelHeaderSimpleProps) => {
  const platform = usePlatform();
  const { webviewType } = useContext(ConfigProviderContext);

  return (
    <div
      {...restProps}
      className={
        classNames(
          getClassname('PanelHeaderSimple', platform),
          {
            'PanelHeaderSimple--transparent': transparent,
            'PanelHeaderSimple--no-visor': !visor,
            'PanelHeaderSimple--vkapps': webviewType === 'vkapps',
          },
          className,
        )
      }
      ref={getRootRef}
    >
      <FixedLayout vertical="top" className="PanelHeaderSimple__fixed" getRootRef={getRef}>
        <div className="PanelHeaderSimple__in">
          <div className="PanelHeaderSimple__left">
            <div className="PanelHeaderSimple__left-in">
              {left}
            </div>
            {platform !== ANDROID && !!addon &&
            <div className="PanelHeaderSimple__addon">
              {addon}
            </div>
            }
          </div>
          <div className="PanelHeaderSimple__content">
            {children}
          </div>
          <div className="PanelHeaderSimple__right">
            {webviewType !== 'vkapps' && right}
          </div>
        </div>
      </FixedLayout>
      {separator && visor && <Separator className="PanelHeaderSimple__separator" />}
    </div>
  );
};

PanelHeaderSimple.defaultProps = {
  separator: true,
  transparent: false,
  visor: true,
};

export default PanelHeaderSimple;

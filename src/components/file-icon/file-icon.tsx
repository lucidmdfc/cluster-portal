import type { FC } from 'react';
import PropTypes from 'prop-types';

type Extension = 'pdf' | string;

const icons: Record<Extension, any> = {
  pdf: '/assets/icons/icon-pdf.svg',
};

interface FileIconProps {
  extension?: Extension | null;
}

export const FileIcon: FC<FileIconProps> = (props) => {
  const { extension } = props;

  let icon: string;

  if (!extension) {
    icon = '/assets/icons/icon-other.svg';
  } else {
    icon = icons[extension] || '/assets/icons/icon-other.svg';
  }

  return <img src={icon} alt="icon" />;
};

FileIcon.propTypes = {
  extension: PropTypes.string,
};

import React from 'react';
import classNames from 'classnames';

export const buttonWidthEnum = {
  full: 'full',
};

export const BadgeSizes = {
  L: 'l',
  M: 'm',
  S: 's',
  Xs: 'xs',
};

export const BadgeVariants = {
  Default: 'default',
  AccentLight: 'accent-light',
};

export function Button({ children, className, form = 'defaultBrick', onClick, size = 'm', variant = 'primary', width }) {
  return (
    <button
      className={classNames(
        'kit-button',
        `kit-button-size-${size}`,
        `kit-button-variant-${variant}`,
        `kit-button-form-${form}`,
        {
          'kit-button-full': width === buttonWidthEnum.full,
        },
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function Chip({ className, endIcon, label, onClick, selected }) {
  return (
    <button className={classNames('kit-chip', { 'kit-chip-selected': selected }, className)} onClick={onClick} type="button">
      <span>{label}</span>
      {endIcon ? <span className="kit-chip-end-icon">{endIcon}</span> : null}
    </button>
  );
}

export function Badge({ children, className, onClick, size = BadgeSizes.S, variant = BadgeVariants.Default }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag className={classNames('kit-badge', `kit-badge-size-${size}`, `kit-badge-variant-${variant}`, className)} onClick={onClick} type={onClick ? 'button' : undefined}>
      {children}
    </Tag>
  );
}

export function SegmentedButtons({ fullWidth, hasError, items, name, onChangeAction, value }) {
  return (
    <div className={classNames('kit-segmented', { 'kit-segmented-full': fullWidth, 'kit-segmented-error': hasError })} role="radiogroup">
      {items.map((item) => (
        <label className="kit-segmented-item" htmlFor={`${name}-${item.value}`} key={item.value}>
          <input
            checked={value === item.value}
            id={`${name}-${item.value}`}
            name={name}
            onChange={() => onChangeAction(item.value)}
            type="radio"
            value={item.value}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
}

export function TextField({ className, showTooltip, ...props }) {
  return <input className={classNames('kit-text-field', className)} {...props} />;
}

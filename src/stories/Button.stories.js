import React from 'react';
import Button from '../components/button';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button>Button</Button>;

export const TrailingIcon = () => <Button type="primary">
  Button
  <svg className="mr-0.5 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clip-rule="evenodd"/>
  </svg>
</Button>;

export const LeadingIcon = () => <Button type="primary">
  <svg className="ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clip-rule="evenodd"/>
  </svg>
  Email Us
</Button>;

export const PrimaryButtons = () => (
  <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="primary" size="tiny">Tiny Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="primary" size="small">Small Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="primary" size="medium">Medium Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="primary" size="large">Large Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="primary" size="extra_large">Extra Large Button</Button>
    </span>
  </div>
);

export const SecondaryButtons = () => (
  <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="secondary" size="tiny">Tiny Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="secondary" size="small">Small Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="secondary" size="medium">Medium Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="secondary" size="large">Large Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button type="secondary" size="extra_large">Extra Large Button</Button>
    </span>
  </div>
);

export const NormalButtons = () => (
  <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <span className="inline-flex rounded-md shadow-sm">
      <Button size="tiny">Tiny Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button size="small">Small Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button size="medium">Medium Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button size="large">Large Button</Button>
    </span>
    <span className="inline-flex rounded-md shadow-sm">
      <Button size="extra_large">Extra Large Button</Button>
    </span>
  </div>
);


import React from 'react';
import Badge from '../components/badges';

export default {
  title: 'Badges',
  component: Badge
}

export const Basic = () => (
  <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
    <Badge>Badge</Badge>
    <Badge type="success">Badge</Badge>
    <Badge type="danger">Badge</Badge>
    <Badge type="primary">Badge</Badge>
    <Badge type="secondary">Badge</Badge>
    <Badge type="warning">Badge</Badge>
  </div>
);
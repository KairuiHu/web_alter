import React from 'react';
import { cn } from '@/lib/cn';

interface HttpMethodIconProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  className?: string;
}

const methodColors = {
  GET: 'bg-green-100 text-green-800 border-green-200',
  POST: 'bg-blue-100 text-blue-800 border-blue-200',
  PUT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  PATCH: 'bg-orange-100 text-orange-800 border-orange-200',
  DELETE: 'bg-red-100 text-red-800 border-red-200',
  HEAD: 'bg-purple-100 text-purple-800 border-purple-200',
  OPTIONS: 'bg-gray-100 text-gray-800 border-gray-200',
};

export function HttpMethodIcon({ method, className }: HttpMethodIconProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded border',
        methodColors[method],
        className
      )}
    >
      {method}
    </span>
  );
}

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width} className='grid gap-2'>
      <Label htmlFor={name} className='flex items-center font-bold'>
        {label}

        {required && (
          <span className="required text-destructive">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input defaultValue={defaultValue}
        id={name}
        type="text"
        className='rounded-sm py-6 border-0 backdrop-blur-3xl'
        {...register(name, { required })} />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}

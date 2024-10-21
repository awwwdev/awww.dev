import React, { Children, ElementType } from "react";
import { Database } from './supabase/db_types';

export type RNode = React.ReactNode;


export type Children = { children: React.ReactNode };
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLProps<T extends ElementType> = React.ComponentPropsWithoutRef<T>
// frequently used props type  in uikit ----------------------------------------------- 
export type CLS = { className?: string | null, preStyled?: boolean; };

"use client";

import { useActionState } from 'react';
import { loginAction, registerAction } from './actions';

export function useLoginForm() {
  return useActionState(loginAction, { error: "" });
}

export function useRegisterForm() {
  return useActionState(registerAction, { error: "" });
}

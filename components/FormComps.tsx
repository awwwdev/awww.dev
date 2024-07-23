import { ErrorMessage } from "@hookform/error-message";
import { FormProvider, useForm, useFormContext, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject } from "zod";
import LoadingSpinner from "./ui/LoadingSpinner";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import Button from "./ui/button";

type FormProps = React.ComponentPropsWithoutRef<"form"> & {
  form: any;
  children: React.ReactNode;
  submitText?: string;
  hasSubmitButton?: boolean;
};

type UseFormHookProps = UseFormProps & {
  schema: ZodObject<any>;
  onSubmit: (values: z.infer<UseFormHookProps["schema"]>, event?: React.FormEvent) => void;
  shouldResetOnSuccess?: boolean;
};

export const useFormHook = ({ schema, onSubmit, shouldResetOnSuccess = true, ...formOptions }: UseFormHookProps) => {
  type FormTypes = z.infer<typeof schema>;
  const { handleSubmit, ...f } = useForm<FormTypes>({ resolver: zodResolver(schema), ...formOptions });
  const _onSubmit = async (fromValues, event) => {
    try {
      await onSubmit(fromValues, event);
      if (shouldResetOnSuccess) {
        f.reset(); // resetting the forma values, so users wont resubmit the same data after a successful submit
      }
    } catch (err) {
      f.setError("root.submit", { message: err?.message });
    }
  };
  return { ...f, onSubmit: handleSubmit(_onSubmit) };
};

export const Form = ({ form, children, hasSubmitButton = true, submitText = "submit", ...props }: FormProps) => (
  <FormProvider {...form}>
    <form {...props} onSubmit={form.onSubmit}>
      {children}
      {hasSubmitButton && (
        <>
          <ErrMsg name="root.submit" />
          <button type="submit" className="btn-prm !mt-8 !mb-8" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <LoadingSpinner /> : submitText}
          </button>
        </>
      )}
    </form>
  </FormProvider>
);

Form.displayName = 'From';

type InputElProps = React.ComponentPropsWithoutRef<"input"> & {
  name: string;
  hasErrorMessage?: boolean;
};
type InputProps = InputElProps & { hint?: React.ReactNode; label?: React.ReactNode; hasErrorMessage?: boolean };

type TextAreaElProps = React.ComponentPropsWithoutRef<"textarea"> & {
  name: string;
  hasErrorMessage?: boolean;
};
type TextAreaProps = TextAreaElProps & { hint?: React.ReactNode; label?: React.ReactNode; hasErrorMessage?: boolean };

const FormInput = ({ label, hasErrorMessage = true, name, ...inputProps }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  if (["checkbox", "radio"].includes(inputProps?.type ?? "")) {
    return (
      <label className="block space-y-1">
        <div className="flex gap-1">
          <InputEl name={name} {...inputProps} className={`${inputProps.className ?? ""} field `} />
          <span className="c-sand11 fw-500 capitalize">{label ?? name}</span>
        </div>
        {hasErrorMessage && <ErrMsg name={name} />}
      </label>
    );
  }

  return (
    <Input {...inputProps} {...register(name)} label={label ?? name} errorMessage={error?.message?.toString() ?? ""} />
  );
};

Form.Input = FormInput;

const FormTextArea = ({ label, hasErrorMessage = true, name, ...inputProps }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return <TextArea {...inputProps} {...register(name)} label={label} errorMessage={error?.message?.toString() ?? ""} />;
};

Form.TextArea = FormTextArea;

export const InputEl = ({ name, ...inputProps }: InputElProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return <input {...register(name)} aria-invalid={error ? "true" : "false"} {...inputProps} />;
};

export const ErrMsg = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return <ErrorMessage errors={errors} name={name} as="p" role="alert" className="c-red11 bf-i-ph-warning-octagon" />;
};

const ErrMsgEl = ({ errors, name }: { errors: any; name: string }) => (
  <ErrorMessage errors={errors} name={name} as="p" role="alert" className="c-red11 bf-i-ph-warning-octagon" />
);

type ButtonProps = {
  variation?: "ghost" | "ghost-prm" | "solid" | "solid-prm" | "text" | "text-prm" | "soft" | "soft-prm";
  iconButton?: boolean;
  noPreStyle?: boolean;
  width?: "parent" | "content" | "default";
} & React.ComponentPropsWithoutRef<"button">;

const FormSubmitButton = function ({ children, variation = "solid-prm", className = "", width = "content" }: ButtonProps) {
  const { register, formState } = useFormContext();

  return (
    <Button
      type="submit"
      className={className}
      variation={variation}
      width={width}
      disabled={formState.isSubmitting}
      isLoading={formState.isSubmitting}
    >
      {" "}
      {formState.isSubmitting ? <LoadingSpinner /> : children}
    </Button>
  );
};

Form.SubmitButton = FormSubmitButton;


const FormServerErrorMessage = function () {
  return <ErrMsg name="root.submit" />;
};

Form.ServerErrorMessage = FormServerErrorMessage;
// type FormStateProviderProps = {
//   children: (form: any) => React.ReactNode;
// };

// export const FormStateProvider = ({ children }: FormStateProviderProps) => {
//   const form = useFormContext();
//   return <>{children(form)}</>;
// };

//  const ErrorLine = (props: any) => {
//   const {
//     formState: { errors },
//   } = useFormContext();
//   const defaultRender = ({ msg }) => (
//     <p role='alert' className='error-line text-xs'>
//       {msg}
//     </p>
//   );
//   const render = props.render ?? defaultRender;
//   return <ErrorMessage errors={errors} name={props.name} render={render} />;
// };

// const ErrorMsg = ({ error, hasErrorMessage }) => {
//   return (
//     <>
//       {error && hasErrorMessage && (
//         <p role='alert' className='text-tiny-note c-red11'>
//           {error?.message.toString()}
//         </p>
//       )}
//     </>
//   );
// };

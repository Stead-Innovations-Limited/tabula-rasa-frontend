import { AxiosResponse, AxiosError } from "axios";

export type Result = {
  data: unknown;
  errors: string[] | string;
  isError: boolean;
  statusCode: number;
};

export async function tryCatch(
  cb: () => Promise<AxiosResponse<unknown, unknown> | undefined>
): Promise<Result> {
  const result: Result = {
    data: null,
    errors: [],
    isError: false,
    statusCode: 200,
  };

  try {
    const response = await cb();
    if (response !== undefined) {
      result.data = response.data;
    } else {
      result.errors = "unexpected error";
    }
  } catch (error) {
    console.log(error)
    result.isError = true;


    if (error instanceof AxiosError) {
      result.statusCode = error.response?.status ?? 500;
      result.errors = error.response?.data.error ?? "unexpected error occurred";
    }
  }
  return result;
}

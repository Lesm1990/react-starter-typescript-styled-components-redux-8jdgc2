export default function (
    type: CreateFetchTypesArguments
  ): CreateFetchTypesReturnType {
    return [`${type}_REQUEST`, `${type}_SUCCESS`, `${type}_FAILURE`];
  }
  type CreateFetchTypesArguments = string;
  type CreateFetchTypesReturnType = string[];
  
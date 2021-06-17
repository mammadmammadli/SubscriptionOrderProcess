import React from 'react';
import { IAsync } from '../../models';
import { isPending, isSuccess } from '../../utils';

type TRenderer = () => React.ReactElement;

interface Props<T> {
	loadingRenderer: TRenderer;
	successRenderer: (resp: T) => React.ReactElement;
	branch: IAsync<T>;
}

export function Async<T = {}>({
	branch,
	loadingRenderer,
	successRenderer,
}: Props<T>) {
	const { data } = branch;

	if (isPending(branch)) {
		return loadingRenderer();
	} else if (isSuccess(branch)) {
		return successRenderer(data!);
	}

	return null;
}
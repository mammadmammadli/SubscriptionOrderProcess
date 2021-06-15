import React from 'react';
import { IAsync } from '../../models';

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
	const { data, status } = branch;

	if (status === "PENDING") {
		return loadingRenderer();
	} else if (status === "SUCCESS") {
		return successRenderer(data!);
	}

	return null;
}
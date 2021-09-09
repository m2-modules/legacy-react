/// <reference types="react" />
import { Action } from '../interfaces';
export declare type MultiActionButtonPropsType = {
    name: string;
    action: (...args: any) => any;
    subActions?: Action[];
};
declare const MultiActionButton: (props: MultiActionButtonPropsType) => JSX.Element;
export default MultiActionButton;
//# sourceMappingURL=MultiActionButton.d.ts.map
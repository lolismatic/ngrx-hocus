# Ngrx Hocus

A library for using ngrx store with decorators.

# Status

This is just a prototype library for the moment.

No testing done, for the love of God do not use it in production.

# Setup

## Module import

Import the root module configuration for the `AppModule` or `CoreModule`.

```typescript
@NgModule({
  imports: [HocusModule.forRoot()]
})
export class AppModule {}

```

Import the feature module configuration for any lazy loaded module, or child module of the root.

```typescript
@NgModule({
  imports: [HocusModule.forFeature()]
})
export class AppModule {}

```

## Using the decorators

Some context for the app state...

```typescript
export interface PageState {
  title: string;
}

export interface AppState {
  page: PageState;
}
```

Some actions context...

```typescript
import { Action } from '@ngrx/store';

export class ChangeTitle implements Action {
  public readonly type = '[page] Change title';

  constructor(public readonly title: string) {}
}

export type PageActions = ChangeTitle;
```

Some context for the reducer...

```typescript
import { PageActions, ChangeTitle } from './actions';

export const INITIAL_STATE = {
  title: 'Old boring title'
};

export const REDUCER = function(
  state: PageState = INITIAL_STATE,
  action: PageActions
) {
  switch (action.type) {
    case '[page] Change title':
      return { ...state, title: action.title };
      // ...
  }
}
```

Lastly the usage of the decorators...

```typescript
import { Select, Dispatch, Dispatchable } from 'ngrx-hocus';

import { ChangeTitle } from './actions';

@Component({ template: '<h1>{{title}}</h1>' })
export class AppComponent {
  @Select('page', 'title') title: string;

  @Dispatch(ChangeTitle) changeTitle: Dispatchable<typeof ChangeTitle>;

  ngOnInit(): void {
    this.changeTitle('Hello, new Title');
  }
}
```

Select will bind the value of the state to the title, read only.

Dispatch will bind a method to the AppComponent that will dispatch a ChangeTitle action.

If the reducer is properly set the `AppComponent`'s title will be `Hello, new Title`

## Optionally

_(But highly recommanded...)_

Create a `hocus.ts` file in the src folder of the application with the following content.

```typescript
import { SelectFrom, DispatchFrom } from 'ngrx-hocus';

import { AppState } from './reducers';
import { AppActions } from './actions';

declare module 'ngrx-hocus' {
  export const Select: SelectFrom<AppState>;
  export const Dispatch: DispatchFrom<AppActions>;
}
```

Where the `AppState` is the state of the application and the `AppActions` is a union type of all the application actions.

This will re-declare the `Select` and `Dispatch` but keep the implementation working.



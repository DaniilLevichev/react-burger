export type TIngredientType = {
    _id:            string;
    name:           string;
    type:           string;
    proteins:       number;
    fat:            number;
    carbohydrates:  number;
    calories:       number;
    price:          number;
    image:          string;
    image_mobile:   string;
    image_large:    string;
    __v:            number;
    id?:            string;
    count?:         number;
    lastPrice?:     number;
    totalPrice?:     number;
}

export type TPlaceComponent = {
    component:      TIngredientType
    id:             string | undefined;
    index:          number;
    moveComponent:  (arg0:number, arg1:number) => void;
}

export type TShowIngredient = {
    ingredient:     TIngredientType;
    type:           string;
    openModal:      (arg0: string) => void;
    setIngredient:  (arg0: TIngredientType) => void;
}

export type TModalType = {
    header?:        string;
    onClicked:      () => void;
    children:       React.ReactNode;
}

export type TModalOverlay = {
    onClick: () => void;
}

export type TOrderDetail = {
    orderNumber: number;
}

export type TProtectedRoute = {
    element: React.ReactNode;
}

export type TWSResponseOrder = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}
    
export type TWSResponseOrders = {
    orders: Array<TWSResponseOrder>;
    success: boolean;
    total: number;
    totalToday: number;
}

export type TWSResponse = {
    connect: boolean;
    error?: unknown;
    messages: Array<TWSResponseOrders>
    wsConnected: boolean;
}
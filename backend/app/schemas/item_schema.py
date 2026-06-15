class Item_Base_Model():
    id:int
    name:str
    price:int
    images:list
    class Config:
        from_attributes=True
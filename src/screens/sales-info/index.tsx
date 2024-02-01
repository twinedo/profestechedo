import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Spacer, Input, Button} from 'components/basic';
import SalesOrder from 'components/layout/sales-order';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import {BLACK, PRIMARY, WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Counter} from 'components/layout';
import {percentageHeight} from 'utils/screenSize';
import Modal from 'react-native-modal';
import {
  TBodyOrderItems,
  useCreateItem,
  useDeleteItem,
  useGetItemList,
  useUpdateItem,
} from 'services/api';
import {UseQueryResult} from '@tanstack/react-query';

type ResponseItems = {
  data: TBodyOrderItems[];
} & UseQueryResult;

export default function SalesInfo() {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const {data, refetch} = useGetItemList() as ResponseItems;

  const {createItem, isSuccess: isCreateSuccess} = useCreateItem();
  const {deleteItem, isSuccess: isDeleteSuccess} = useDeleteItem();
  const {updateItem, isSuccess: isUpdateSuccess} = useUpdateItem();

  const [newData, setNewData] = useState<TBodyOrderItems[]>(data || []);

  const [newItem, setNewItem] = useState<TBodyOrderItems>({
    ItemId: 0,
    ItemName: '',
    OrderId: 0,
    Quantity: 0,
    Price: 0,
  });

  const [selectedItem, setSelectedItem] = useState<TBodyOrderItems>({
    ItemId: 0,
    ItemName: '',
    OrderId: 0,
    Quantity: 0,
    Price: 0,
  });

  console.log('datadawsd', JSON.stringify(newData));

  const itemTotals =
    newData && newData?.map(item => item.Quantity * item.Price);

  const totalAmount =
    itemTotals && itemTotals.reduce((sum, itemTotal) => sum + itemTotal, 0);

  const _onCreateItem = () => {
    const item: TBodyOrderItems = {
      ItemId: Math.round(Math.random()),
      OrderId: Math.round(Math.random()),
      ItemName: newItem.ItemName,
      Quantity: newItem.Quantity,
      Price: newItem.Price,
    };
    createItem(item);
  };

  const _onUpdateItem = () => {
    updateItem(selectedItem);
  };

  const _onDeleteItem = () => {
    deleteItem(selectedItem);
  };

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
      setNewItem({} as TBodyOrderItems);
      setIsModalAdd(false);
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      setNewItem({} as TBodyOrderItems);
      setIsModalUpdate(false);
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
      setNewItem({} as TBodyOrderItems);
      setSelectedItem({} as TBodyOrderItems);
      setIsModalDelete(false);
    }
  }, [isDeleteSuccess]);

  return (
    <View style={[globalStyles.displayFlex, {backgroundColor: PRIMARY}]}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <View style={[globalStyles.displayFlex, {backgroundColor: WHITE}]}>
        <SafeAreaView style={[globalStyles.displayFlex]}>
          <SalesOrder title="Sales Order Input">
            <View
              style={[
                styles.sectionSearch,
                globalStyles.horizontalDefaultPadding,
                globalStyles.verticalDefaultPadding,
              ]}>
              <Text style={[globalStyles.headingBold.h3]}>
                Sales Information
              </Text>
              <Spacer height={10} />
              <Input
                placeholder="Sales Order Number"
                containerStyle={{borderColor: '#979C9F'}}
              />
              <Spacer height={10} />
              <Input
                placeholder="Sales Order Date"
                containerStyle={{borderColor: '#979C9F'}}
                postfix={
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={24}
                    color="#979C9F"
                  />
                }
              />
              <Spacer height={10} />
              <Input
                placeholder="Customer"
                containerStyle={{borderColor: '#979C9F'}}
                postfix={
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={24}
                    color="#979C9F"
                  />
                }
              />
            </View>
            <Spacer height={30} />
            <View
              style={[
                globalStyles.row,
                globalStyles.justifySpaceBetween,
                globalStyles.alignCenter,
              ]}>
              <Text style={[globalStyles.headingBold.h1]}>Detail Sales</Text>

              <Button
                onPress={() => setIsModalAdd(true)}
                backgroundColor={PRIMARY}
                containerStyle={{width: 98, height: 29, borderRadius: 10}}
                textStyle={{fontSize: 12}}>
                Add Item
              </Button>
            </View>
            <View style={[]}>
              <FlatList
                data={newData}
                keyExtractor={item => item.ItemId.toString()}
                ItemSeparatorComponent={() => <Spacer height={22} />}
                style={{height: percentageHeight(30)}}
                contentContainerStyle={[{padding: 10}]}
                renderItem={({item}) => (
                  <Pressable
                    style={[
                      globalStyles.horizontalDefaultPadding,
                      globalStyles.verticalDefaultPadding,
                      globalStyles.row,

                      globalStyles.justifyAround,
                      {
                        borderRadius: 15,
                        backgroundColor: WHITE,
                        elevation: 15,
                      },
                    ]}>
                    <View style={[globalStyles.justifySpaceBetween]}>
                      <Text style={[globalStyles.headingBold.h2]}>
                        {item.ItemName}
                      </Text>
                      <Text style={[globalStyles.headingBold.h2]}>
                        {item.Price}
                      </Text>
                    </View>
                    <View style={[globalStyles.alignCenter]}>
                      <Text style={[globalStyles.headingMedium.h3]}>QTY</Text>
                      <Counter
                        defaultValue={item.Quantity}
                        onChangeValue={val => console.log('val', val)}
                      />
                    </View>
                    <View
                      style={[
                        globalStyles.alignCenter,
                        globalStyles.justifySpaceBetween,
                      ]}>
                      <Text style={[globalStyles.headingMedium.h3]}>Total</Text>
                      <Text style={[globalStyles.headingMedium.h3]}>
                        {item.Quantity * item.Price}
                      </Text>
                    </View>
                    <View
                      style={[
                        globalStyles.row,
                        globalStyles.alignCenter,
                        globalStyles.columnGap,
                      ]}>
                      <Octicons
                        name="pencil"
                        size={24}
                        color={BLACK}
                        onPress={() => {
                          setIsModalUpdate(true);
                          setSelectedItem(item);
                        }}
                      />
                      <Feather
                        name="trash-2"
                        size={24}
                        color={BLACK}
                        onPress={() => {
                          setIsModalDelete(true);
                          setSelectedItem(item);
                        }}
                      />
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </SalesOrder>
          <Modal isVisible={isModalAdd}>
            <View
              style={[globalStyles.displayFlex, globalStyles.justifyCenter]}>
              <View
                style={[
                  globalStyles.horizontalDefaultPadding,
                  globalStyles.verticalDefaultPadding,
                  {backgroundColor: WHITE, borderRadius: 10},
                ]}>
                <Text
                  style={[
                    globalStyles.textAlignCenter,
                    globalStyles.headingBold.h3,
                  ]}>
                  New Item
                </Text>
                <Spacer height={20} />
                <Text style={[globalStyles.headingBold.h3]}>Item Name</Text>
                <Spacer height={10} />
                <Input
                  placeholder="Barang 1"
                  value={newItem.ItemName}
                  onChangeText={(value: string) =>
                    setNewItem({...newItem, ItemName: value})
                  }
                />
                <Spacer height={30} />
                <Text style={[globalStyles.headingBold.h3]}>Price</Text>
                <Spacer height={10} />
                <Input
                  placeholder="1000"
                  value={newItem?.Price?.toString()}
                  onChangeText={(value: string) =>
                    setNewItem({...newItem, Price: parseInt(value)})
                  }
                />
                <Spacer height={30} />
                <View style={[globalStyles.row, globalStyles.alignCenter]}>
                  <Text style={[globalStyles.headingBold.h3]}>QTY</Text>
                  <Spacer width={30} />
                  <Counter
                    defaultValue={newItem.Quantity}
                    onChangeValue={val =>
                      setNewItem({
                        ...newItem,
                        Quantity: val,
                      })
                    }
                  />
                </View>
                <Spacer height={20} />
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifySpaceBetween,
                  ]}>
                  <Text style={[globalStyles.headingBold.h2]}>Total: </Text>
                  <Text style={[globalStyles.headingBold.h2]}>
                    {newItem.Price * newItem.Quantity}
                  </Text>
                </View>
                <Spacer height={10} />
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifyEven,
                  ]}>
                  <Button
                    onPress={_onCreateItem}
                    containerStyle={{height: 28, width: 125}}
                    textStyle={{fontSize: 13}}>
                    Save
                  </Button>
                  <Button
                    onPress={() => setIsModalAdd(false)}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      height: 28,
                      width: 125,
                      borderWidth: 1,
                    }}
                    textColor={BLACK}
                    textStyle={{fontSize: 13}}>
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
          <Modal isVisible={isModalUpdate}>
            <View
              style={[globalStyles.displayFlex, globalStyles.justifyCenter]}>
              <View
                style={[
                  globalStyles.horizontalDefaultPadding,
                  globalStyles.verticalDefaultPadding,
                  {backgroundColor: WHITE, borderRadius: 10},
                ]}>
                <Text
                  style={[
                    globalStyles.textAlignCenter,
                    globalStyles.headingBold.h3,
                  ]}>
                  Update Item
                </Text>
                <Spacer height={20} />
                <Text style={[globalStyles.headingBold.h3]}>Item Name</Text>
                <Spacer height={10} />
                <Input
                  placeholder="Barang 1"
                  value={selectedItem.ItemName}
                  onChangeText={(value: string) =>
                    setSelectedItem({...selectedItem, ItemName: value})
                  }
                />
                <Spacer height={30} />
                <Text style={[globalStyles.headingBold.h3]}>Price</Text>
                <Spacer height={10} />
                <Input
                  placeholder="1000"
                  value={selectedItem?.Price?.toString()}
                  onChangeText={(value: string) =>
                    setSelectedItem({...selectedItem, Price: parseInt(value)})
                  }
                />
                <Spacer height={30} />
                <View style={[globalStyles.row, globalStyles.alignCenter]}>
                  <Text style={[globalStyles.headingBold.h3]}>QTY</Text>
                  <Spacer width={30} />
                  <Counter
                    defaultValue={newItem.Quantity}
                    onChangeValue={val =>
                      setSelectedItem({
                        ...selectedItem,
                        Quantity: val,
                      })
                    }
                  />
                </View>
                <Spacer height={20} />
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifySpaceBetween,
                  ]}>
                  <Text style={[globalStyles.headingBold.h2]}>Total: </Text>
                  <Text style={[globalStyles.headingBold.h2]}>
                    {selectedItem.Price * selectedItem.Quantity}
                  </Text>
                </View>
                <Spacer height={10} />
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifyEven,
                  ]}>
                  <Button
                    onPress={_onUpdateItem}
                    containerStyle={{height: 28, width: 125}}
                    textStyle={{fontSize: 13}}>
                    Save
                  </Button>
                  <Button
                    onPress={() => setIsModalAdd(false)}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      height: 28,
                      width: 125,
                      borderWidth: 1,
                    }}
                    textColor={BLACK}
                    textStyle={{fontSize: 13}}>
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={isModalDelete}
            onBackButtonPress={() => setIsModalDelete(false)}
            onBackdropPress={() => setIsModalDelete(false)}>
            <View
              style={[globalStyles.displayFlex, globalStyles.justifyCenter]}>
              <View
                style={[
                  globalStyles.horizontalDefaultPadding,
                  globalStyles.verticalDefaultPadding,
                  globalStyles.alignCenter,
                  {backgroundColor: WHITE, borderRadius: 10},
                ]}>
                <Image
                  source={require('assets/images/ic_question.png')}
                  style={{width: 194, height: 194}}
                />
                <Spacer height={20} />
                <Text
                  style={[
                    globalStyles.textAlignCenter,
                    globalStyles.headingBold.h3,
                  ]}>
                  Are you sure wants to delete this item?
                </Text>
                <Spacer height={20} />

                <View
                  style={[
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifyEven,
                    globalStyles.w100,
                  ]}>
                  <Button
                    onPress={_onDeleteItem}
                    containerStyle={{height: 28, width: 125}}
                    textStyle={{fontSize: 13}}>
                    Yes
                  </Button>
                  <Button
                    onPress={() => setIsModalDelete(false)}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      height: 28,
                      width: 125,
                      borderWidth: 1,
                    }}
                    textColor={BLACK}
                    textStyle={{fontSize: 13}}>
                    No
                  </Button>
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={[
              globalStyles.horizontalDefaultPadding,
              globalStyles.verticalDefaultPadding,
              {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: WHITE,
              },
            ]}>
            <Text style={[globalStyles.headingBold.h3]}>Order Summary</Text>
            <View
              style={[
                globalStyles.row,
                globalStyles.alignCenter,
                globalStyles.justifySpaceBetween,
              ]}>
              <Text style={[globalStyles.bodyMedium.body1]}>Sub Total:</Text>
              <Text style={[globalStyles.bodyMedium.body1]}>{totalAmount}</Text>
            </View>
            <View
              style={[
                globalStyles.row,
                globalStyles.alignCenter,
                globalStyles.justifySpaceBetween,
              ]}>
              <Text style={[globalStyles.bodyMedium.body1]}>
                Total Product:
              </Text>
              <Text style={[globalStyles.bodyMedium.body1]}>
                {newData.length === 0 ? '0' : newData.length} Product
              </Text>
            </View>
            <Spacer height={10} />
            <View
              style={[
                globalStyles.row,
                globalStyles.alignCenter,
                globalStyles.justifyEven,
              ]}>
              <Button
                containerStyle={{height: 28, width: 125}}
                textStyle={{fontSize: 13}}>
                Process Order
              </Button>
              <Button
                containerStyle={{
                  backgroundColor: 'transparent',
                  height: 28,
                  width: 125,
                  borderWidth: 1,
                }}
                textColor={BLACK}
                textStyle={{fontSize: 13}}>
                Cancel
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionSearch: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#979C9F',
  },
});

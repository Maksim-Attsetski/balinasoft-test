import React, { Dispatch, FC, memo, RefObject, SetStateAction } from 'react';

import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { Button, Flex, Gap, Text } from '@/components';
import { ITask } from '../types';
import { useThemeColor } from '@/hooks';

interface IProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  sortBy: keyof ITask;
  setSortBy: Dispatch<SetStateAction<keyof ITask>>;
  showOnly: keyof ITask;
  setShowOnly: Dispatch<SetStateAction<keyof ITask>>;
}

const TaskFilterModal: FC<IProps> = ({
  bottomSheetRef,
  setSortBy,
  sortBy,
  setShowOnly,
  showOnly,
}) => {
  const backgroundColor = useThemeColor('cardBg');
  const indicatorColor = useThemeColor('text');

  const onPressSortBy = (newSortBy: keyof ITask) => {
    if (newSortBy === sortBy) return;

    setSortBy(newSortBy);
  };

  const onPressShowOnly = (newShowOnly: keyof ITask) => {
    if (newShowOnly === showOnly) return;

    setShowOnly(newShowOnly);
  };

  return (
    <>
      <Flex>
        <Button
          to={{
            pathname: '/(routes)/task-action',
          }}
          full
          size='small'
          type='primary'
        >
          Добавить задачу
        </Button>
        <Gap />
        <Button
          full
          size='small'
          type='secondary'
          btnProps={{
            onPress: () => bottomSheetRef?.current?.snapToIndex?.(0),
          }}
        >
          Показать фильтры
        </Button>
      </Flex>
      <BottomSheet
        enablePanDownToClose
        enableDynamicSizing
        ref={bottomSheetRef}
        index={-1}
        containerStyle={{ zIndex: 9999 }}
        backgroundStyle={{ backgroundColor }}
        handleIndicatorStyle={{ backgroundColor: indicatorColor }}
      >
        <BottomSheetView style={[{ backgroundColor }, styles.contentContainer]}>
          <Gap />
          <Text style={styles.sortText}>Сортировать по</Text>
          <Gap />
          <Flex>
            <Button
              btnProps={{ onPress: () => onPressSortBy('created_at') }}
              type={sortBy === 'created_at' ? 'primary' : 'common'}
              full
              size='small'
            >
              Времени
            </Button>
            <Button
              btnProps={{ onPress: () => onPressSortBy('name') }}
              type={sortBy === 'name' ? 'primary' : 'common'}
              size='small'
              full
            >
              Алфавиту
            </Button>
          </Flex>
          <Gap />
          <Text style={styles.sortText}>Показывать только</Text>
          <Gap />
          <Flex gap={0}>
            <Button
              btnProps={{
                onPress: () => onPressShowOnly('id'),
                style: styles.leftBtn,
              }}
              type={showOnly === 'id' ? 'primary' : 'common'}
              full
              size='small'
            >
              Все
            </Button>
            <Button
              btnProps={{
                onPress: () => onPressShowOnly('is_done'),
                style: styles.centerBtn,
              }}
              type={showOnly === 'is_done' ? 'primary' : 'common'}
              full
              size='small'
            >
              Сделанные
            </Button>
            <Button
              btnProps={{
                onPress: () => onPressShowOnly('is_pinned'),
                style: styles.rightBtn,
              }}
              type={showOnly === 'is_pinned' ? 'primary' : 'common'}
              size='small'
              full
            >
              Закрепленыне
            </Button>
          </Flex>
          <Gap />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  sortText: {
    color: 'lightgrey',
    fontSize: 14,
  },
  contentContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  leftBtn: {
    paddingHorizontal: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  centerBtn: {
    paddingHorizontal: 8,
    borderRadius: 0,
  },
  rightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default memo(TaskFilterModal);

import { Button, Flex, Gap, Text } from '@/components';
import { Colors, staticColors } from '@/global';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  Dispatch,
  FC,
  memo,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { ITask } from '../types';

interface IProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  sortBy: keyof ITask;
  setSortBy: Dispatch<SetStateAction<keyof ITask>>;
}

const TaskFilterModal: FC<IProps> = ({ bottomSheetRef, setSortBy, sortBy }) => {
  const onPressSortBy = (newSortBy: keyof ITask) => {
    if (newSortBy === sortBy) return;

    setSortBy(newSortBy);
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      enablePanDownToClose
      enableDynamicSizing
      ref={bottomSheetRef}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
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
      </BottomSheetView>
    </BottomSheet>
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
    backgroundColor: '#FFF',
  },
});

export default memo(TaskFilterModal);

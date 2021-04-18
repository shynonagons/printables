import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Dimensions } from 'react-native';

import SelectableItem from '../components/SelectableItem';
import { Text, View } from '../components/Themed';
import { SelectableItemProps } from '../types';
import usePrint from '../hooks/usePrint'

const defaultSelectOptions = [
  {name: 'Avengers', uri: 'https://maxcdn.icons8.com/Share/icon/Cinema/avengers1600.png'},
  {name: 'Captain America', uri: 'https://findicons.com/files/icons/1182/quickpix_2009/128/captain_america.png'},
  {name: 'Iron Man', uri: 'https://www.pngkey.com/png/detail/3-37485_iron-man-logo-iron-man-head-png.png'}, 
  {name: 'Black Panther', searchTerm: 'black panther avengers', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aac39ffc-42e8-49fe-a1a1-9706baf7af0d/dc0ju3a-43c05b09-1394-4b45-b442-94fe52834df8.png/v1/fill/w_200,h_200,q_70,strp/black_panther_character_icon_by_thelivingethan_dc0ju3a-200h.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2FhYzM5ZmZjLTQyZTgtNDlmZS1hMWExLTk3MDZiYWY3YWYwZFwvZGMwanUzYS00M2MwNWIwOS0xMzk0LTRiNDUtYjQ0Mi05NGZlNTI4MzRkZjgucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-JaPYqgqqzFyGZ8Z_cWKfyeUXWP7_-ECWUEP1slT_pI'}, 
  {name: 'Spider-man', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/4cae31d3-d924-4073-b5ba-017def95a9e1/dbete4j-68022db7-ac9c-42e9-b40d-3e2c7e24c234.png'},
  {name: 'Hulk', uri: 'https://img.icons8.com/color/1600/hulk.png'},
  {name: 'Batman', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d5d9f6da-e403-4764-9396-fb8a4c4dbcbb/duyuc8-38864f0e-89c0-4acf-9715-70bebcc8f97c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9kNWQ5ZjZkYS1lNDAzLTQ3NjQtOTM5Ni1mYjhhNGM0ZGJjYmIvZHV5dWM4LTM4ODY0ZjBlLTg5YzAtNGFjZi05NzE1LTcwYmViY2M4Zjk3Yy5wbmcifV1dfQ.Xg8g3a-WtlSHjlNRo8tf84QdcJytunx-x25SUJAuqK0'},
  {name: 'Superman', uri: 'https://logos-download.com/wp-content/uploads/2018/03/Superman_logo_pink.png'},
  {name: 'Thor', uri: 'https://cdn0.iconfinder.com/data/icons/famous-character-vol-1-colored/48/JD-20-512.png'},
  {name: 'Aquaman', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/765582ae-ee02-4dc4-851a-d3dc540cdf79/d417pbx-977afaf2-f360-4f34-9157-cbc512723312.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi83NjU1ODJhZS1lZTAyLTRkYzQtODUxYS1kM2RjNTQwY2RmNzkvZDQxN3BieC05NzdhZmFmMi1mMzYwLTRmMzQtOTE1Ny1jYmM1MTI3MjMzMTIucG5nIn1dXX0.Wxbm5SBYe1uoDPRI4GxO-Jd9a9zzE3k7c9VrrNI8y3Y'},
  {name: 'Flash', uri: 'https://cdn4.iconfinder.com/data/icons/superhero/400/flash.png'},
  {name: 'Hawkeye', uri: 'https://www.pngkey.com/png/full/361-3616242_hawkeye-avengers-logo-5-by-john-hawkeye-logo.png'},
  {name: 'Black Widow', uri: 'https://img.pngio.com/black-widow-logo-vector-icon-template-clipart-free-download-black-widow-logo-1179_1200.jpg'},
  {name: 'Ant-man', uri: 'https://www.clipartkey.com/mpngs/m/72-720022_ant-man-logo-marvel.png'},
  {name: 'Wasp', searchTerm: 'wasp avengers', uri: 'https://static.miraheze.org/allthetropeswiki/b/be/Wasp_EMH_4199.png'},
  {name: 'Falcon', searchTerm: 'Falcon avengers', uri: 'https://i.pinimg.com/originals/e3/e9/c1/e3e9c1b9e4d23befd811d1002cd8817c.jpg'},
  {name: 'Green Lantern', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Green_lantern.svg/1200px-Green_lantern.svg.png'},
  {name: 'Wolverine', searchTerm: 'wolverine xmen', uri: 'https://www.freepngimg.com/thumb/xmen/21435-4-wolverine.png'},
  {name: 'Storm', searchTerm: 'storm xmen', uri: 'https://upload.wikimedia.org/wikipedia/vi/f/f9/X-Men_Storm_Main.png'},
  {name: 'Juggernaut', searchTerm: 'juggernaut xmen', uri: 'https://art.ngfiles.com/images/1360000/1360116_roadblocktron_x-men-juggernaut-mega-man.png?f1595523135'},
  {name: 'Guardians', searchTerm: 'Guardians of the galaxy', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec05c3de-724c-4af5-814c-31899618ffd5/d85u5zp-a74cff4d-fa9f-4d9f-8b61-5e3de1637038.jpg/v1/fill/w_1024,h_1536,q_75,strp/guardians_of_the_galaxy_badge_no_bg_by_momopjonny-d85u5zp.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9lYzA1YzNkZS03MjRjLTRhZjUtODE0Yy0zMTg5OTYxOGZmZDUvZDg1dTV6cC1hNzRjZmY0ZC1mYTlmLTRkOWYtOGI2MS01ZTNkZTE2MzcwMzguanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTE1MzYifV1dfQ.bF18VcCj09gJM0EXy6CgFhKQukiSbVk9YF8UtTRF6EE'},
  {name: 'Venom', searchTerm: 'spider-man venom', uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aac39ffc-42e8-49fe-a1a1-9706baf7af0d/dbgrq23-ee7a8ee2-ff35-431a-9c70-51b5e05246e5.jpg/v1/fill/w_894,h_894,q_75,strp/venom_icon_by_thelivingethan-dbgrq23.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9hYWMzOWZmYy00MmU4LTQ5ZmUtYTFhMS05NzA2YmFmN2FmMGQvZGJncnEyMy1lZTdhOGVlMi1mZjM1LTQzMWEtOWM3MC01MWI1ZTA1MjQ2ZTUuanBnIiwid2lkdGgiOiI8PTg5NCIsImhlaWdodCI6Ijw9ODk0In1dXX0.fJm4j5bJKmRjphfbRY2fleQObzXGDNhkkH7UTqZJdkQ'},
  {name: 'Green Goblin', searchTerm: 'spider-man green goblin', uri: 'https://i1.wp.com/www.techsavvyed.net/wp-content/uploads/2010/11/GreenGoblinIIASM1361.gif?fit=510%2C501'},
  {name: 'Catboy', uri: 'https://i.pinimg.com/originals/9b/1d/ff/9b1dff0cffa3bdf117783cc86b329242.jpg'},
  {name: 'Owlette', uri: 'https://i.pinimg.com/originals/c4/d8/8f/c4d88fc8db9dc20d3e9f88295286b66a.jpg'},
  {name: 'Gekko', uri: 'https://i.pinimg.com/originals/c5/12/d8/c512d86b40c1eae24c9d6be0d5cc8d93.jpg'},
].map((i, index) => ({...i, key: index}))

export default function SelectScreen() {
  const [selectOptions, setSelectOptions] = React.useState<SelectableItemProps[]>()
  const { printCount, getStoredPrintCount } = usePrint();
  React.useEffect(() => {
    setSelectOptions(defaultSelectOptions)
    getStoredPrintCount();
  }, [])

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text>You have printed {printCount} pages so far</Text>
      <FlatList
        data={selectOptions}
        numColumns={Math.floor(width / 180)}
        renderItem={({item}) => <SelectableItem {...item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

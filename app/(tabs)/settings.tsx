import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity, View,} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {ThemedText} from "@/components/ThemedText";
import {useRouter} from "expo-router";

export default function Example() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const router = useRouter();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.profile}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt=""
              source={{
                uri: "https://thumbs.dreamstime.com/b/arabic-muslim-man-beard-smiling-36429753.jpg",
              }}
              style={styles.profileAvatar}/>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.profileAction}>
                <FontAwesome5 color="#fff" name="pen" size={15}/>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View>
          <ThemedText style={styles.profileName}>عبد الله</ThemedText>
          <ThemedText style={styles.profileAddress}>
            123 شارع الملك عبد العزيز - المدينة المنورة
          </ThemedText>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>الاعدادات</ThemedText>

          <TouchableOpacity
            onPress={() => {
              router.push('/languages');
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
              <FontAwesome5
                name="globe"
                color="#fff"
                size={18}
              />
            </View>

            <ThemedText style={styles.rowLabel}>اللغة</ThemedText>

            <View style={styles.rowSpacer}/>

            <FontAwesome5
              name="chevron-left"
              color="#C6C6C6"
              size={18}
            />
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
              <FontAwesome5
                name="moon"
                color="#fff"
                size={18}
              />
            </View>

            <ThemedText style={styles.rowLabel}>الوضع الليلي</ThemedText>

            <View style={styles.rowSpacer}/>

            <Switch
              onValueChange={darkMode => setForm({...form, darkMode})}
              value={form.darkMode}/>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
              <FontAwesome5
                color="#fff"
                name="location-arrow"
                size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>الموقع</ThemedText>

            <View style={styles.rowSpacer}/>


            <FontAwesome5
              name="chevron-left"
              color="#C6C6C6"
              size={18}
            />
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
              <FontAwesome5 color="#fff" name="at" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>تنبيهات البريد</ThemedText>

            <View style={styles.rowSpacer}/>

            <Switch
              onValueChange={emailNotifications =>
                setForm({...form, emailNotifications})
              }
              value={form.emailNotifications}/>
          </View>

          <View style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
              <FontAwesome5 color="#fff" name="bell" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>تنبيهات منبثقة</ThemedText>

            <View style={styles.rowSpacer}/>

            <Switch
              onValueChange={pushNotifications =>
                setForm({...form, pushNotifications})
              }
              value={form.pushNotifications}/>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>تواصل</ThemedText>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#8e8d91'}]}>
              <FontAwesome5 color="#fff" name="flag" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>
              الإبلاغ عن مشكل
            </ThemedText>

            <View style={styles.rowSpacer}/>

            <FontAwesome5
              color="#C6C6C6"
              name="chevron-left"
              size={18}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
              <FontAwesome5 color="#fff" name="envelope" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>تواصل معنا</ThemedText>

            <View style={styles.rowSpacer}/>

            <FontAwesome5
              color="#C6C6C6"
              name="chevron-left"
              size={18}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
              <FontAwesome5 color="#fff" name="star" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>قيمنا في متجر التطبيقات</ThemedText>

            <View style={styles.rowSpacer}/>

            <FontAwesome5
              color="#C6C6C6"
              name="chevron-left"
              size={18}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
              <FontAwesome5 color="#fff" name="coffee" size={18}/>
            </View>

            <ThemedText style={styles.rowLabel}>ادعمنا بكوب قهوة؟</ThemedText>

            <View style={styles.rowSpacer}/>

            <FontAwesome5
              color="#C6C6C6"
              name="chevron-left"
              size={18}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  '*': {
    fontFamily: 'Cairo',
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: 'right',
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
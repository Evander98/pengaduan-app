const INITIAL_STATE = {
  id: 0,
  namaLengkap: '',
  email: '',
  jenisKelamin: 0,
  role: 0,
  telepon: '',
  kelurahan: '',
  kecamatan: '',
  kodePos: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...INITIAL_STATE,
        id: action.payload.id,
        namaLengkap: action.payload.nama_lengkap,
        email: action.payload.email,
        jenisKelamin: action.payload.jenis_kelamin,
        role: action.payload.role,
        telepon: action.payload.nomor_telepon,
        kelurahan: action.payload.kelurahan,
        kecamatan: action.payload.kecamatan,
        kodePos: action.payload.kode_pos,
      };
    case 'ERROR_MESSAGE':
      return {...INITIAL_STATE, error: action.payload};
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};

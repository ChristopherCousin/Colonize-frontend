export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: "AF", name: "Afganistán", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Argelia", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", flag: "🇦🇩" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaiyán", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸" },
  { code: "BD", name: "Bangladés", flag: "🇧🇩" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "HR", name: "Croacia", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", flag: "🇨🇺" },
  { code: "CY", name: "Chipre", flag: "🇨🇾" },
  { code: "CZ", name: "Chequia", flag: "🇨🇿" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰" },
  { code: "DO", name: "Rep. Dominicana", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "EG", name: "Egipto", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "FI", name: "Finlandia", flag: "🇫🇮" },
  { code: "FR", name: "Francia", flag: "🇫🇷" },
  { code: "DE", name: "Alemania", flag: "🇩🇪" },
  { code: "GR", name: "Grecia", flag: "🇬🇷" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "HU", name: "Hungría", flag: "🇭🇺" },
  { code: "IS", name: "Islandia", flag: "🇮🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IR", name: "Irán", flag: "🇮🇷" },
  { code: "IQ", name: "Irak", flag: "🇮🇶" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  { code: "JP", name: "Japón", flag: "🇯🇵" },
  { code: "KE", name: "Kenia", flag: "🇰🇪" },
  { code: "KR", name: "Corea del Sur", flag: "🇰🇷" },
  { code: "LV", name: "Letonia", flag: "🇱🇻" },
  { code: "LT", name: "Lituania", flag: "🇱🇹" },
  { code: "LU", name: "Luxemburgo", flag: "🇱🇺" },
  { code: "MY", name: "Malasia", flag: "🇲🇾" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "MA", name: "Marruecos", flag: "🇲🇦" },
  { code: "NL", name: "Países Bajos", flag: "🇳🇱" },
  { code: "NZ", name: "Nueva Zelanda", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", name: "Noruega", flag: "🇳🇴" },
  { code: "PK", name: "Pakistán", flag: "🇵🇰" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "PH", name: "Filipinas", flag: "🇵🇭" },
  { code: "PL", name: "Polonia", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "RO", name: "Rumanía", flag: "🇷🇴" },
  { code: "RU", name: "Rusia", flag: "🇷🇺" },
  { code: "SA", name: "Arabia Saudí", flag: "🇸🇦" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "SG", name: "Singapur", flag: "🇸🇬" },
  { code: "SK", name: "Eslovaquia", flag: "🇸🇰" },
  { code: "SI", name: "Eslovenia", flag: "🇸🇮" },
  { code: "ZA", name: "Sudáfrica", flag: "🇿🇦" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "SE", name: "Suecia", flag: "🇸🇪" },
  { code: "CH", name: "Suiza", flag: "🇨🇭" },
  { code: "TH", name: "Tailandia", flag: "🇹🇭" },
  { code: "TR", name: "Turquía", flag: "🇹🇷" },
  { code: "UA", name: "Ucrania", flag: "🇺🇦" },
  { code: "AE", name: "Emiratos Árabes", flag: "🇦🇪" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
];

export function getCountryByCode(code: string): CountryInfo | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getFlag(code: string): string {
  return getCountryByCode(code)?.flag || "🏳️";
}

const NORMALIZE_REGEX = /[\s\u0300-\u036f]/g;

export function filterCountries(query: string): CountryInfo[] {
  if (!query.trim()) return COUNTRIES;
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(NORMALIZE_REGEX, "");
  return COUNTRIES.filter((c) => {
    const nameNorm = c.name.normalize("NFD").replace(NORMALIZE_REGEX, "").toLowerCase();
    const codeNorm = c.code.toLowerCase();
    return nameNorm.includes(normalized) || codeNorm.includes(normalized);
  });
}

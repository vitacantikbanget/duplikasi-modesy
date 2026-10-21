/**
 * ============================================================================
 * ROOT PROFILE REDIRECTOR
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Mengarahkan akses dari /profile ke profil default admin /profile/admin.
 */

import { redirect } from "next/navigation";

export default function ProfileRootPage() {
  redirect("/profile/admin");
}

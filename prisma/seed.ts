import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  const roles = [
    'SUPER_ADMIN',
    'TENANT_ADMIN',
    'BUYER',
    'APPROVER',
    'VIEWER',
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role,
      },
      update: {},
      create: {
        name: role,
      },
    });
  }
}

async function seedPermissions() {
  const permissions = [
    {
      code: 'tenant.create',
      name: 'Create Tenant',
      description: 'Create tenant',
    },
    {
      code: 'tenant.read',
      name: 'Read Tenant',
      description: 'Read tenant',
    },
    {
      code: 'tenant.update',
      name: 'Update Tenant',
      description: 'Update tenant',
    },
    {
      code: 'tenant.delete',
      name: 'Delete Tenant',
      description: 'Delete tenant',
    },
    {
      code: 'user.create',
      name: 'Create User',
      description: 'Create user',
    },
    {
      code: 'user.read',
      name: 'Read User',
      description: 'Read user',
    },
    {
      code: 'user.update',
      name: 'Update User',
      description: 'Update user',
    },
    {
      code: 'user.delete',
      name: 'Delete User',
      description: 'Delete user',
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        code: permission.code,
      },

      update: {},

      create: {
        code: permission.code,
        name: permission.name,
        description:
          permission.description,
      },
    });
  }
}

async function seedRolePermissions() {
  const superAdmin =
    await prisma.role.findUnique({
      where: {
        name: 'SUPER_ADMIN',
      },
    });

  const tenantAdmin =
    await prisma.role.findUnique({
      where: {
        name: 'TENANT_ADMIN',
      },
    });

  const viewer =
    await prisma.role.findUnique({
      where: {
        name: 'VIEWER',
      },
    });

  const permissions =
    await prisma.permission.findMany();

  if (superAdmin) {
    for (const permission of permissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: superAdmin.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: superAdmin.id,
          permissionId: permission.id,
        },
      });
    }
  }

  if (tenantAdmin) {
    const tenantAdminPermissions =
      permissions.filter((permission) =>
        [
          'tenant.read',
          'tenant.update',
          'user.create',
          'user.read',
          'user.update',
        ].includes(permission.name),
      );

    for (const permission of tenantAdminPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: tenantAdmin.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: tenantAdmin.id,
          permissionId: permission.id,
        },
      });
    }
  }

  if (viewer) {
    const viewerPermissions =
      permissions.filter((permission) =>
        [
          'tenant.read',
          'user.read',
        ].includes(permission.code),
      );

    for (const permission of viewerPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: viewer.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: viewer.id,
          permissionId: permission.id,
        },
      });
    }
  }
}

async function seedDefaultTenant() {
  await prisma.tenant.upsert({
    where: {
      code: 'PROCURAIQ',
    },
    update: {},
    create: {
      name: 'ProcuraIQ Default Tenant',
      code: 'PROCURAIQ',
    },
  });
}

async function main() {
  console.log('🌱 Seeding database...');

  await seedRoles();

  await seedPermissions();

  await seedRolePermissions();

  await seedDefaultTenant();

  console.log('✅ Seeding completed');
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
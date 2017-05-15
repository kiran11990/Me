using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;

namespace CrEST.Infra
{
    [ExcludeFromCodeCoverage]
    public static class DependencyFactory
    {
        private static IUnityContainer _container = InitializeContainer();

        static IUnityContainer InitializeContainer()
        {
            var container = new UnityContainer();

            var section = (UnityConfigurationSection)ConfigurationManager.GetSection("unity");
            if (section?.Containers.Count > 0)
            {
                section?.Configure(container);
            }
            return container;
        }

        public static IUnityContainer Container => _container;


        public static T Resolve<T>()
        {
            T ret = default(T);

            if (IsRegisteredInternal<T>())
            {
                ret = Container.Resolve<T>();
            }

            return ret;
        }
        public static T Resolve<T>(string key)
        {
            T ret = default(T);

            if (Container.IsRegistered<T>(key))
            {
                ret = Container.Resolve<T>(key);
            }

            return ret;
        }

        private static bool IsRegisteredInternal<T>()
        {
            if (Container.IsRegistered<T>())
                return true;
            if (typeof(T).IsGenericType)
            {
                return Container.IsRegistered(typeof(T).GetGenericTypeDefinition());
            }
            return false;
        }
    }
}
